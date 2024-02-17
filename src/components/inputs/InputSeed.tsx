import { ChangeEvent, useEffect, useState } from "react";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import { faker } from "@faker-js/faker";
import { useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";

export default function InputSeed() {
    const params = useSearchParams();
    const [seed, setSeed] = useState(0);
    const [seedParams, setSeedParams] = useQueryState("seed");

    const handleSetParamsSeed = (seed: string) => {
        if (Number(seed) === 0) {
            setSeedParams(null);
        } else {
            setSeedParams(seed);
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSeed(Number(event.target.value));
        handleSetParamsSeed(event.target.value);
    };

    const handleGenerateRundomSeed = () => {
        const randomSeed = faker.number.int({ max: 1000000 });
        setSeed(randomSeed);
        handleSetParamsSeed(randomSeed.toString());
    };

    useEffect(() => {
        if (params.has("seed")) {
            setSeed(Number(params.get("seed")));
        }
    }, []);

    return (
        <div className="flex items-center gap-3">
            <input
                className="w-32 h-14 text-2xl border"
                type="number"
                value={seed}
                onChange={handleInputChange}
                min={0}
            />
            <button
                className="cursor-pointer"
                onClick={handleGenerateRundomSeed}
            >
                <ArrowPathRoundedSquareIcon className="text-black h-8" />
            </button>
        </div>
    );
}
