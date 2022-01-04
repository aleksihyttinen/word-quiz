export default function LanguageSelection(props) {
  return (
    <select defaultValue={props.selected} name="languages">
      {props.languages.map((language) => {
        return (
          <option key={language} value={language}>
            {language}
          </option>
        );
      })}
    </select>
  );
}
