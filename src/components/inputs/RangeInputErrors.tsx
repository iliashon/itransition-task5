import { Slider } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";

export default function RangeInputErrors() {
    const params = useSearchParams();
    const [countErrors, setCountErrors] = useState(0);
    const [paramsErrorCount, setParamsErrorCount] = useQueryState("errors");

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setCountErrors(newValue as number);
        setParamsErrorCount(newValue.toString());
        newValue === 0 ? setParamsErrorCount(null) : "";
    };
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (Number(event.target.value) > 1000) {
            setCountErrors(1000);
            setParamsErrorCount(`1000`);
        } else {
            setCountErrors(Number(event.target.value));
            setParamsErrorCount(event.target.value);
        }
        Number(event.target.value) === 0 ? setParamsErrorCount(null) : "";
    };

    useEffect(() => {
        if (params.has("errors")) {
            setCountErrors(Number(params.get("errors")));
        }
    }, []);

    return (
        <div className="w-52 flex items-center gap-5">
            <Slider
                aria-label="CountError"
                valueLabelDisplay="auto"
                value={countErrors}
                onChange={handleSliderChange}
                min={0}
                max={10}
                step={0.25}
            />
            <input
                className="w-32 h-14 text-2xl border"
                type="number"
                value={countErrors}
                max={1000}
                min={0}
                onChange={handleInputChange}
            />
        </div>
    );
}
