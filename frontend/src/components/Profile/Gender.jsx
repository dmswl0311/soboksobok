const GenderSelectBox = ({ setGender }) => {
  const handleChange = (e) => {
    setGender(e.target.value);
    console.log('e.target.value: ', e.target.value);
  };

  return (
    <select id="selectAge" defaultValue="placeholder" onChange={handleChange}>
      <option value="placeholder" disabled>
        선택
      </option>
      <option value="female">female</option>
      <option value="male">male</option>
    </select>
  );
};

export default GenderSelectBox;
