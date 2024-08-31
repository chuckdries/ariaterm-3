import { useState } from "react";
import { Helmet } from "react-helmet";
import { Select, SelectItem } from "./components/Select";
import { Checkbox } from "./components/Checkbox";
import { TextField } from "./components/TextField";
import { FileTable } from "./features/FileTable/FileTable";

type Theme = "amber" | "emerald" | "fuchsia";

function App() {
  const [name, setName] = useState("");
  const [theme, setTheme] = useState<Theme>("amber");
  const [lightMode, setLightMode] = useState(true);

  return (
    <div className="flex-auto flex flex-col items-stretch">
      <Helmet>
        <html className={`${lightMode ? "" : "dark"} ${theme}`} />
      </Helmet>

      <div className="flex gap-2 p-2 items-end">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>

        <Select label="theme" selectedKey={theme} onSelectionChange={setTheme}>
          <SelectItem id="amber">amber</SelectItem>
          <SelectItem id="fuchsia">fuchsia</SelectItem>
          <SelectItem id="emerald">emerald</SelectItem>
        </Select>
        <TextField label="name" value={name} onChange={setName} />
        <Checkbox
          className="py-2"
          isSelected={lightMode}
          onChange={setLightMode}
        >
          Light mode
        </Checkbox>
      </div>
      <div className="flex-auto flex items-stretch justify-stretch">
        <FileTable className="min-h-0 flex-auto" />
      </div>
    </div>
  );
}

export default App;
