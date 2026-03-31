import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '../Icon/Icon';
import Button from '../Button/Button';
import AddAnimalForm from '../AddAnimalForm/AddAnimalForm';
import taisonPhoto from '../../assets/images/animals/taison.png';
import murkaPhoto from '../../assets/images/animals/murka.jpg';
import bimPhoto from '../../assets/images/animals/bim.png';
import lisaPhoto from '../../assets/images/animals/lisa.png';
import './AnimalCardsList.css';

interface AnimalCard {
  id: string;
  name: string;
  species: 'dog' | 'cat';
  gender: 'male' | 'female';
  age: string;
  size: 'small' | 'medium' | 'large';
  status: 'in_shelter' | 'reserved' | 'adopted' | 'unavailable';
  vaccinated: boolean;
  sterilized: boolean;
  photoUrl: string;
}

const MOCK_ANIMALS: AnimalCard[] = [
  {
    id: '1',
    name: 'Тайсон',
    species: 'dog',
    gender: 'male',
    age: '3 роки',
    size: 'large',
    status: 'in_shelter',
    vaccinated: true,
    sterilized: true,
    photoUrl: taisonPhoto,
  },
  {
    id: '2',
    name: 'Мурка',
    species: 'cat',
    gender: 'female',
    age: '1 рік',
    size: 'small',
    status: 'reserved',
    vaccinated: true,
    sterilized: false,
    photoUrl: murkaPhoto,
  },
  {
    id: '3',
    name: 'Бім',
    species: 'dog',
    gender: 'male',
    age: '5 років',
    size: 'medium',
    status: 'in_shelter',
    vaccinated: false,
    sterilized: true,
    photoUrl: bimPhoto,
  },
  {
    id: '4',
    name: 'Ліза',
    species: 'cat',
    gender: 'female',
    age: '2 роки',
    size: 'small',
    status: 'adopted',
    vaccinated: true,
    sterilized: true,
    photoUrl: lisaPhoto,
  },
];

const AnimalCardsList: React.FC = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState<AnimalCard | null>(null);

  const filteredAnimals =
    filter === 'all'
      ? MOCK_ANIMALS
      : MOCK_ANIMALS.filter(a => a.species === filter);

  const statusLabel = (status: AnimalCard['status']) => {
    const labels: Record<string, string> = {
      in_shelter: t('shelterDashboard.animals.statusInShelter'),
      reserved: t('shelterDashboard.animals.statusReserved'),
      adopted: t('shelterDashboard.animals.statusAdopted'),
      unavailable: t('shelterDashboard.animals.statusUnavailable'),
    };
    return labels[status];
  };

  const statusClass = (status: AnimalCard['status']) => {
    const classes: Record<string, string> = {
      in_shelter: 'status--active',
      reserved: 'status--reserved',
      adopted: 'status--adopted',
      unavailable: 'status--unavailable',
    };
    return classes[status];
  };

  if (editingAnimal) {
    return (
      <AddAnimalForm
        onClose={() => setEditingAnimal(null)}
        initialData={{
          name: editingAnimal.name,
          species: editingAnimal.species,
          gender: editingAnimal.gender,
          size: editingAnimal.size,
          vaccinated: editingAnimal.vaccinated,
          sterilized: editingAnimal.sterilized,
        }}
      />
    );
  }

  if (showAddForm) {
    return <AddAnimalForm onClose={() => setShowAddForm(false)} />;
  }

  return (
    <div className="animals-list">
      <div className="animals-list-header">
        <h2 className="animals-list-title">
          {t('shelterDashboard.animals.title')}
        </h2>
        <Button
          variant="primary"
          maxWidth="200px"
          onClick={() => setShowAddForm(true)}
        >
          + {t('shelterDashboard.animals.addAnimal')}
        </Button>
      </div>

      <div className="animals-list-filters">
        {['all', 'dog', 'cat'].map(f => (
          <button
            key={f}
            className={`animals-filter-btn ${filter === f ? 'animals-filter-btn--active' : ''}`}
            onClick={() => setFilter(f)}
            type="button"
          >
            {f === 'all'
              ? t('shelterDashboard.animals.filterAll')
              : f === 'dog'
                ? t('shelterDashboard.animals.filterDogs')
                : t('shelterDashboard.animals.filterCats')}
          </button>
        ))}
      </div>

      <div className="animals-table-wrapper">
        <table className="animals-table">
          <thead>
            <tr>
              <th>{t('shelterDashboard.animals.photo')}</th>
              <th>{t('shelterDashboard.animals.name')}</th>
              <th>{t('shelterDashboard.animals.species')}</th>
              <th>{t('shelterDashboard.animals.gender')}</th>
              <th>{t('shelterDashboard.animals.age')}</th>
              <th>{t('shelterDashboard.animals.status')}</th>
              <th>{t('shelterDashboard.animals.health')}</th>
              <th>{t('shelterDashboard.animals.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredAnimals.map(animal => (
              <tr key={animal.id}>
                <td>
                  <div className="animals-table-photo">
                    {animal.photoUrl ? (
                      <img src={animal.photoUrl} alt={animal.name} />
                    ) : (
                      <Icon id="icon-user" size={24} />
                    )}
                  </div>
                </td>
                <td className="animals-table-name">{animal.name}</td>
                <td>
                  {animal.species === 'dog'
                    ? t('shelterDashboard.animals.dog')
                    : t('shelterDashboard.animals.cat')}
                </td>
                <td>
                  <Icon
                    id={
                      animal.gender === 'male' ? 'icon-male' : 'icon-female'
                    }
                    size={16}
                  />
                </td>
                <td>{animal.age}</td>
                <td>
                  <span
                    className={`animals-status ${statusClass(animal.status)}`}
                  >
                    {statusLabel(animal.status)}
                  </span>
                </td>
                <td>
                  <div className="animals-health">
                    {animal.vaccinated && (
                      <span
                        className="animals-health-badge"
                        title={t('shelterDashboard.animals.vaccinated')}
                      >
                        {t('shelterDashboard.animals.vaccinatedShort')}
                      </span>
                    )}
                    {animal.sterilized && (
                      <span
                        className="animals-health-badge"
                        title={t('shelterDashboard.animals.sterilized')}
                      >
                        {t('shelterDashboard.animals.sterilizedShort')}
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <div className="animals-actions">
                    <button
                      type="button"
                      className="animals-action-btn"
                      title={t('shelterDashboard.animals.edit')}
                      onClick={() => setEditingAnimal(animal)}
                    >
                      {t('shelterDashboard.animals.edit')}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnimalCardsList;
