"use client";

import {
    InputLabel,
    Select,
    FormControl,
    MenuItem,
    SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useQueryState } from "nuqs";
import { useSearchParams } from "next/navigation";

const COUNTRY_LIST = [
    {
        name: "USA",
        code: "en",
    },
    {
        name: "Russian",
        code: "ru",
    },
    {
        name: "Germany",
        code: "de",
    },
    {
        name: "French",
        code: "fr",
    },
    {
        name: "Poland",
        code: "pl",
    },
];

export default function SelectCountry() {
    const params = useSearchParams();

    const [country, setCountry] = useState<number>(0);

    const [locale, setLocale] = useQueryState("locale");

    const handleChange = (event: SelectChangeEvent) => {
        setCountry(Number(event.target.value));
        setLocale(COUNTRY_LIST[Number(event.target.value)].code);
    };

    useEffect(() => {
        params.has("locale")
            ? COUNTRY_LIST.forEach((location, index) => {
                  if (location.code === params.get("locale")) {
                      setCountry(index);
                  }
              })
            : "";
    }, []);

    return (
        <div className="w-36">
            <FormControl fullWidth>
                <InputLabel id="select-country-label">Region</InputLabel>
                <Select
                    labelId="select-country-label"
                    id="select-country"
                    className="h-10"
                    label="Region"
                    value={`${country}`}
                    onChange={handleChange}
                >
                    {COUNTRY_LIST.map((country, index) => {
                        return (
                            <MenuItem key={country.code} value={index}>
                                {country.name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </div>
    );
}
