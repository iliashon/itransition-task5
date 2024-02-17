import SelectCountry from "@/components/inputs/SelectCountry";
import RangeInputErrors from "@/components/inputs/RangeInputErrors";
import InputSeed from "@/components/inputs/InputSeed";
import { Button } from "@mui/material";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

export default function ToolBar({ handleSave }: { handleSave: () => void }) {
    return (
        <div className="flex px-4 w-full items-center justify-between">
            <SelectCountry />
            <RangeInputErrors />
            <InputSeed />
            <Button
                component="label"
                color="success"
                variant="contained"
                startIcon={<ArrowDownTrayIcon className="h-5" />}
                onClick={handleSave}
            >
                Save CSV
            </Button>
        </div>
    );
}
