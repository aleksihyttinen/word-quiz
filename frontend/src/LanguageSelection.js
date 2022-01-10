export default function LanguageSelection(props) {
  const changeLanguage = (e) => {
    if (props.whichList === undefined) {
      props.setDisplayedLanguage(e.target.value);
    }
    if (props.whichList === "first") {
      props.setDisplayedLanguages({
        first: e.target.value,
        second: props.displayedLanguages.second,
      });
    }
    if (props.whichList === "second") {
      props.setDisplayedLanguages({
        first: props.displayedLanguages.first,
        second: e.target.value,
      });
    }
  };
  return (
    <select
      defaultValue={props.selected}
      onChange={changeLanguage}
      name="languages"
    >
      {props.languages.map((language) => {
        return (props.whichList === "second" &&
          language === props.displayedLanguages.first) ||
          (props.whichList === "first" &&
            language === props.displayedLanguages.second) ? (
          <option key={language} disabled value={language}>
            {language}
          </option>
        ) : (
          <option key={language} value={language}>
            {language}
          </option>
        );
      })}
    </select>
  );
}
