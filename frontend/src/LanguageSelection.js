export default function LanguageSelection(props) {
  console.log(props.selected);
  return (
    <select name="languages">
      {props.languages.map((language) => {
        return props.selected === language ? (
          <option selected={props.selected} value={language}>
            {language}
          </option>
        ) : (
          <option value={language}>{language}</option>
        );
      })}
    </select>
  );
}
