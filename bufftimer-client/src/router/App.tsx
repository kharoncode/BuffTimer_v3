import { Route, Routes, HashRouter } from 'react-router-dom';
import Header from '@/components/header/Header';
import Home from '@/pages/home/Home';
import { Login } from '@/pages/login/Login';
import Favoris from '@/pages/favoris/Favoris';
import Players from '@/pages/players/Players';
import { persistor, store } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import PrivateRoute from '@/utils/PrivateRoute';
import Info from '@/pages/info/Info';
import Player from '@/pages/player/Player';
import User from '@/pages/user/User';
import { UserMenu } from '@/components/userMenu/UserMenu';
import { PlayerMenu } from '@/components/playerMenu/PlayerMenu';

function App() {
   return (
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <HashRouter>
               <Header />
               <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route element={<PrivateRoute />}>
                     <Route path="/user/:section" element={<User />}>
                        <Route path="/user/:section" element={<UserMenu />} />
                     </Route>
                     <Route path="/player/:section/:id" element={<Player />}>
                        <Route
                           path="/player/:section/:id"
                           element={<PlayerMenu />}
                        />
                     </Route>
                     <Route path="/favoris" element={<Favoris />} />
                     <Route path="/players" element={<Players />} />
                     <Route path="/info" element={<Info />} />
                  </Route>
               </Routes>
            </HashRouter>
         </PersistGate>
      </Provider>
   );
}

export default App;
