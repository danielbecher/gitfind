import {useState} from 'react';
import {Header} from '../../components/Header';
import background from '../../assets/background.png';
import ItemList from '../../components/ItemList';
import './styles.css';

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();
    if (newUser.name) {
      const {avatar_url, name, bio, login} = newUser;
      setCurrentUser({avatar_url, name, bio, login});
      
      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      console.log(repos)

      if (newRepos.length) {
        setRepos(newRepos);
      }
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={background} className="background" alt="Background App" />
        <div className="info">
          <div className="info-box">
            <input name="usuario" placeholder="@username" value={user} onChange={event => setUser(event.target.value)}/>
            <button onClick={handleGetData}>Buscar</button>
          </div>
          {currentUser?.name ? (
            <>
              <div className="perfil">
              <img src={currentUser.avatar_url} className="profile" alt="Perfil" />
              <div className="profile-box">
                <h3>{currentUser.name}</h3>
                <span>@{currentUser.login}</span>
                <p>{currentUser.bio}</p>
              </div>
              </div>              
            </>
          ): null}
          {repos?.length ? (
            <>
              <hr />
              <div>
                <h4 className="repositorio">Repositórios</h4>
                {repos.map(repo => (
                  <ItemList title={repo.name} description={repo.description} url={repo.html_url} />
                ))}
              </div>            
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;