import React from 'react';
import { Icon } from '../Icon/Icon';
import './AnimalCard.css';

interface Animal {
  id: number;
  name: string;
  age: string;
  gender: 'male' | 'female';
  image: string;
  description: string;
}
interface AnimalCardProps {
  animal: Animal;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  return (
    <div className="card">
      <img className="animal-img" src={animal.image} alt={animal.name} />
      <button
        className="btn-favourite "
        type="button"
        aria-label={`Favourite ${animal.name}`}
      >
        <Icon id="icon-favourite" className="favourite" size={20} height={18} />
      </button>
      <div className="wrap">
        <h3 className="animal-name">{animal.name}</h3>
        <div className="wrap-block">
          <div className="block block-age">
            <span>{animal.age}</span>
          </div>
          <div className="block block-gender">
            <Icon id="icon-gender" size={20} height={20} />
          </div>
        </div>
      </div>
      <p className="animal-description">{animal.description}</p>
    </div>
  );
};

export default AnimalCard;
