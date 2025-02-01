import { useState } from 'react';
import Post from './components/Post';
import styles from './App.module.css';
import Comment from './models/Comment';

function App() {
  // Estado para gerenciar os comentários
  const [comments, setComments] = useState<Comment[]>([]);

  return (
    <div className={styles.app}>
      <Post
        imageUrl="https://cdn.awsli.com.br/2500x2500/2571/2571273/produto/223761759/000-6uk7sahybk.jpg"
        comments={comments}
        setComments={setComments}
      >
        Olha só que legal minha miniatura do Batmóvel.
      </Post>
    </div>
  );
}

export default App;