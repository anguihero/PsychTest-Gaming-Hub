import avatars from '../data/avatars.json';

const AvatarSelector = ({ selected, onSelect }) => {
  return (
    <div className="avatar-selector">
      {avatars.map((avatar) => (
        <img
          key={avatar.id}
          src={avatar.image}
          alt={avatar.name}
          className={selected === avatar.id ? 'selected' : ''}
          onClick={() => onSelect(avatar.id)}
        />
      ))}
    </div>
  );
};

export default AvatarSelector;