import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      inputName: '',
      inputEmail: '',
      inputDescription: '',
      inputImage: '',
      disabilet: false,
      direct: false,
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const requestUser = await getUser();
      const { name, email, image, description } = requestUser;
      const { inputName, inputEmail,
        inputDescription, inputImage } = this.state;
      const validationEmail = /\S+@\S+\.\S+/;
      const validacoes = [
        validationEmail.test(inputEmail),
        inputName.length > 0,
        inputDescription.length > 0,
        inputImage.length > 0,
      ];
      const resultValid = validacoes.some((e) => e === false);
      if (!resultValid) {
        this.setState({
          disabilet: false,
        });
      }
      this.setState({
        loading: false,
        inputName: name,
        inputEmail: email,
        inputDescription: description,
        inputImage: image,
      });
    });
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { inputName, inputEmail,
        inputDescription, inputImage } = this.state;
      const validationEmail = /\S+@\S+\.\S+/;
      const validacoes = [
        validationEmail.test(inputEmail),
        inputName.length > 0,
        inputDescription.length > 0,
        inputImage.length > 0,
      ];
      const resultValid = validacoes.some((e) => e === false);
      if (!resultValid) {
        this.setState({
          disabilet: false,
        });
      } else {
        this.setState({
          disabilet: true,
        });
      }
    });
  };

  handleClick = async (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    const { inputName, inputEmail,
      inputDescription, inputImage } = this.state;
    const objUsers = {
      name: inputName,
      email: inputEmail,
      image: inputImage,
      description: inputDescription,
    };
    await updateUser(objUsers);
    this.setState({
      loading: false,
      direct: true,
    });
  };

  render() {
    const { loading, inputName, inputEmail,
      inputDescription, inputImage, disabilet, direct } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {direct && <Redirect to="/profile" />}
        {loading ? <Loading /> : (
          <form>
            <label htmlFor="edit-input-name">
              Nome:
              <input
                name="inputName"
                type="text"
                data-testid="edit-input-name"
                id="edit-input-name"
                value={ inputName }
                onChange={ this.handleChange }
              />
            </label>
            <br />
            <label htmlFor="edit-input-email">
              E-mail:
              <input
                name="inputEmail"
                type="email"
                data-testid="edit-input-email"
                id="edit-input-email"
                value={ inputEmail }
                onChange={ this.handleChange }
              />
            </label>
            <br />
            <label htmlFor="edit-input-description">
              Descrição:
              <input
                name="inputDescription"
                type="text"
                data-testid="edit-input-description"
                id="edit-input-description"
                value={ inputDescription }
                onChange={ this.handleChange }
              />
            </label>
            <br />
            <label htmlFor="edit-input-image">
              Imagem:
              <input
                name="inputImage"
                type="text"
                data-testid="edit-input-image"
                id="edit-input-image"
                value={ inputImage }
                onChange={ this.handleChange }
              />
            </label>
            <br />
            <button
              type="submit"
              data-testid="edit-button-save"
              disabled={ disabilet }
              onClick={ this.handleClick }
            >
              Salvar
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
