const getButtonColor = cover => {
  if (cover === 'teal') {
    return 'pink';
  } else if (cover === 'red') {
    return 'teal';
  } else if (cover === 'pink') {
    return 'pink-dark';
  } else if (cover === 'black') {
    return 'yellow';
  } else if (cover === 'purple') {
    return 'green';
  }
};

export default getButtonColor;
