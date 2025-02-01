import styles from './Post.module.css';
import PostComments from '../PostComments';
import { ReactNode } from 'react';
import Comment from '../../models/Comment'; // Importe o modelo Comment, se necessário

type Props = {
  children: ReactNode;
  imageUrl: string;
  comments?: Comment[]; // Adicione a prop comments
  setComments: (comments: Comment[]) => void; // Adicione a prop setComments
};

const Post = ({ children, imageUrl, comments = [], setComments }: Props) => (
  <div className={styles.post}>
    <img
      className={styles['post-image']}
      src={imageUrl}
      alt="Imagem do post" // Adicione um texto alternativo para acessibilidade
    />
    <p className={styles['post-text']}>{children}</p>
    <PostComments comments={comments} setComments={setComments} /> {/* Passe as props para PostComments */}
  </div>
);

export default Post;