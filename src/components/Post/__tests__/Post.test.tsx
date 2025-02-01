import { render, screen, fireEvent } from '@testing-library/react';
import Post from '../index';

// Mock do componente PostComments
jest.mock('../../PostComments', () => {
  let comments: { id: number; comment: string }[] = []; // Guarda os comentários

  return function MockPostComments({
    setComments,
  }: {
    comments: { id: number; comment: string }[];
    setComments: (comments: { id: number; comment: string }[]) => void;
  }) {
    let inputValue = ''; // Guarda o valor do input

    return (
      <div data-testid="post-comments">
        <ul>
          {comments.map(({ id, comment }) => (
            <li key={id}>{comment}</li> // Mostra os comentários na tela
          ))}
        </ul>
        <textarea
          data-testid="comment-input"
          placeholder="Digite seu comentário"
          onChange={(e) => {
            inputValue = e.target.value; // Atualiza o valor do input
          }}
        />
        <button
          data-testid="submit-button"
          onClick={() => {
            if (inputValue.trim()) {
              const newComment = { id: Date.now(), comment: inputValue }; // Cria um novo comentário
              comments = [...comments, newComment]; // Adiciona o novo comentário à lista
              setComments(comments); // Atualiza a lista de comentários
              inputValue = ''; // Limpa o input
            }
          }}
        >
          Comentar
        </button>
      </div>
    );
  };
});

describe('Componente Post', () => {
  const mockImageUrl = 'https://cdn.awsli.com.br/2500x2500/2571/2571273/produto/223761759/000-6uk7sahybk.jpg';
  const mockChildren = 'Este é um post de exemplo';
  const setCommentsMock = jest.fn(); // Mock da função setComments

  test('Deve renderizar corretamente', () => {
    render(
      <Post
        imageUrl={mockImageUrl}
        setComments={setCommentsMock}
      >
        {mockChildren}
      </Post>
    );

    // Verifica se a imagem foi renderizada
    const imageElement = screen.getByRole('img');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', mockImageUrl);
    expect(imageElement).toHaveClass('post-image');

    // Verifica se o texto foi renderizado
    const textElement = screen.getByText(mockChildren);
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveClass('post-text');

    // Verifica se o componente de comentários foi renderizado
    const postCommentsElement = screen.getByTestId('post-comments');
    expect(postCommentsElement).toBeInTheDocument();
  });

  test('Deve permitir a inserção de dois comentários', () => {
    render(
      <Post
        imageUrl={mockImageUrl}
        setComments={setCommentsMock}
      >
        {mockChildren}
      </Post>
    );

    const input = screen.getByTestId('comment-input'); // Pega o campo de input
    const button = screen.getByTestId('submit-button'); // Pega o botão de enviar

    // Adiciona o primeiro comentário
    fireEvent.change(input, { target: { value: 'Primeiro comentário' } });
    fireEvent.click(button);

    // Adiciona o segundo comentário
    fireEvent.change(input, { target: { value: 'Segundo comentário' } });
    fireEvent.click(button);

    // Verifica se a função setComments foi chamada duas vezes
    expect(setCommentsMock).toHaveBeenCalledTimes(2);

    // Verifica o primeiro comentário
    expect(setCommentsMock).toHaveBeenNthCalledWith(
      1,
      expect.arrayContaining([
        expect.objectContaining({
          comment: 'Primeiro comentário', // Verifica se o primeiro comentário foi adicionado
        }),
      ])
    );

    // Verifica o segundo comentário
    expect(setCommentsMock).toHaveBeenNthCalledWith(
      2,
      expect.arrayContaining([
        expect.objectContaining({
          comment: 'Primeiro comentário', // Verifica se o primeiro comentário ainda está lá
        }),
        expect.objectContaining({
          comment: 'Segundo comentário', // Verifica se o segundo comentário foi adicionado
        }),
      ])
    );
  });
});