import SelectCountry from "@/components/inputs/SelectCountry";
import RangeInputErrors from "@/components/inputs/RangeInputErrors";
import InputSeed from "@/components/inputs/InputSeed";

export default function ToolBar() {
    return (
        <div className="flex gap-14 items-center">
            <SelectCountry />
            <RangeInputErrors />
            <InputSeed />
        </div>
    );
}
