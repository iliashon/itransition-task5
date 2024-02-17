import SelectCountry from "@/components/inputs/SelectCountry";
import RangeInputErrors from "@/components/inputs/RangeInputErrors";
import InputSeed from "@/components/inputs/InputSeed";
import { Button } from "@mui/material";

export default function ToolBar({ handleSave }: { handleSave: () => void }) {
    return (
        <div className="flex gap-14 items-center justify-between">
            <SelectCountry />
            <RangeInputErrors />
            <InputSeed />
            <Button onClick={handleSave}>Save CSV</Button>
        </div>
    );
}
