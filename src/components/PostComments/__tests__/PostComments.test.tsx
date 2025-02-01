import { fireEvent, render, screen } from '@testing-library/react';
import PostComments from '../index';
import Comment from '../../../models/Comment';

describe('Teste para o componente PostComments', () => {
  const mockComments: Comment[] = []; // Lista de comentários vazia
  const setCommentsMock = jest.fn(); // Mock da função setComments

  it('Deve renderizar o componente corretamente', () => {
    render(<PostComments comments={mockComments} setComments={setCommentsMock} />);
    // Verifica se o botão de comentar está na tela
    expect(screen.getByText('Comentar')).toBeInTheDocument();
  });

  it('Deve permitir que o usuário insira um comentário', () => {
    render(<PostComments comments={mockComments} setComments={setCommentsMock} />);
    const input = screen.getByTestId('comment-input'); // Pega o campo de input
    fireEvent.change(input, { target: { value: 'Novo comentário' } }); // Digita um comentário
    expect(input).toHaveValue('Novo comentário'); // Verifica se o valor foi atualizado
  });

  it('Deve enviar o comentário quando o botão for clicado', () => {
    render(<PostComments comments={mockComments} setComments={setCommentsMock} />);
    const input = screen.getByTestId('comment-input'); // Pega o campo de input
    const button = screen.getByTestId('submit-button'); // Pega o botão de enviar

    fireEvent.change(input, { target: { value: 'Novo comentário' } }); // Digita um comentário
    fireEvent.click(button); // Clica no botão de enviar

    // Verifica se a função setComments foi chamada com o novo comentário
    expect(setCommentsMock).toHaveBeenCalledWith([
      ...mockComments,
      expect.objectContaining({ comment: 'Novo comentário' }),
    ]);
  });
});