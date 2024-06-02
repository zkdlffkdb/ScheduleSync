import React from 'react'
import { useNavigate } from 'react-router-dom';
import './MyAccount.css'

export const MyAccount = ({ onLogout, userName }) => {
  const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate("/");
    };

    return (
      <div className="container">
        <div className="heading">
          <div className="text">My Account</div>
          {/*Display name of user*/}
          <p>Hello, {userName}</p> 
        </div>

        {/* Logout Button */}
        <div className="log-out">
          <button onClick={handleLogout}>Logout</button>
        </div>
        
        {/* account-related content*/}
        <p>Account information...</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis quam excepturi iste, laborum esse quis atque facilis sapiente porro, repellendus quas libero corporis doloremque repudiandae nihil veritatis minima quaerat dolor sit ipsa ex. Facere labore quidem ad doloremque facilis aliquid explicabo maxime vel non delectus odio cupiditate accusamus, molestias in consequuntur soluta illo aspernatur perspiciatis inventore odit mollitia sit, est alias? Facilis velit nesciunt officiis doloremque impedit veniam dignissimos assumenda soluta quam natus maxime iste perferendis atque, deleniti vitae nihil! Est reprehenderit magnam ipsum unde quo eos dignissimos mollitia, iure fugit nihil! Vel laudantium veritatis voluptatum error velit ipsam.</p>
        <br></br>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam deleniti, libero enim in dicta ad doloremque quo sunt quidem officia placeat saepe similique vel facilis aut est minus excepturi fugiat. Saepe omnis fuga eaque veniam aliquam vel praesentium, quidem ipsa neque ipsum mollitia, reprehenderit iusto nemo in, doloribus officiis at corporis assumenda. Temporibus quo nulla reiciendis saepe repellat nam veniam vel molestias accusantium vero corporis natus mollitia dolore repellendus quia provident, ut, commodi culpa ullam! Ullam facere vero modi quisquam libero? Atque quod non id! Dolore illo tempora fugiat perspiciatis porro perferendis laborum dolores adipisci nesciunt! Recusandae aut ipsum consequatur?</p>
      </div>
    );
}
