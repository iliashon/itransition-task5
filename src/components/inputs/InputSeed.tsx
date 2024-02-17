import { ChangeEvent, useEffect, useState } from "react";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import { faker } from "@faker-js/faker";
import { useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";

const MAX_NUMBER_SEED = 1000000;

export default function InputSeed() {
    const params = useSearchParams();
    const [seed, setSeed] = useState(0);
    const [seedParams, setSeedParams] = useQueryState("seed", {
        history: "push",
        shallow: false,
    });

    const handleSetParamsSeed = (seed: string) => {
        if (Number(seed) === 0) {
            setSeedParams(null);
        } else {
            setSeedParams(seed);
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (Number(event.target.value) > MAX_NUMBER_SEED) {
            setSeed(MAX_NUMBER_SEED);
            handleSetParamsSeed(MAX_NUMBER_SEED.toString());
        } else {
            setSeed(Number(event.target.value));
            handleSetParamsSeed(event.target.value);
        }
    };

    const handleGenerateRundomSeed = () => {
        const randomSeed = faker.number.int({ max: MAX_NUMBER_SEED });
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
                className="h-10 w-36 rounded-[5px] px-4 text-xl font-light border border-[#008dff]"
                type="number"
                value={seed}
                onChange={handleInputChange}
                min={0}
            />
            <button
                className="cursor-pointer"
                onClick={handleGenerateRundomSeed}
            >
                <ArrowPathRoundedSquareIcon className="text-[#008dff] h-7" />
            </button>
        </div>
    );
}
