import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ register, studentClass, setstudentClass }) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const classes = ["1А", "1Б", "1В", "1Г"];

  async function handleSubmit(e) {
    e.preventDefault();
    const user = {
      username,
      email,
      password,
      student_class: studentClass,
    };

    const res = await register(user);

    console.log(res);

    if (res?.access_token) {
      navigate("/");
    }

    setEmail("");
    setPassword("");
    setUsername("");
    setstudentClass("");
  }

  return (
    <div className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className="register__input"
          type="text"
          name="username"
          placeholder="Username"
          required
        />

        <select
          className="register__input"
          value={studentClass}
          onChange={(e) => setstudentClass(e.target.value)}
          required
        >
          <option value="">Выберите класс</option>
          {classes.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register__input"
          type="email"
          name="email"
          placeholder="E-mail"
          required
        />

        <input
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          className="register__input"
          type="password"
          required
          placeholder="Password"
        />
        <button>Регистрация</button>

        {/* <p className="message">{message}</p> */}
      </form>
    </div>
  );
};

export default Register;
