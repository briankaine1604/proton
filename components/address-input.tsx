"use client";
import React, { useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";

type AddressComboboxProps = {
  value: string;
  onChange: (address: string) => void;
};

type Suggestion = {
  description: string;
  place_id: string;
};

const AddressCombobox: React.FC<AddressComboboxProps> = ({
  value,
  onChange,
}) => {
  const [query, setQuery] = useState("");

  const {
    ready,
    value: inputValue,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const filteredSuggestions: Suggestion[] =
    query === ""
      ? data
      : data.filter((suggestion) =>
          suggestion.description.toLowerCase().includes(query.toLowerCase())
        );

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();
    setQuery(address);
    onChange(address);

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      console.log("Coordinates: ", { lat, lng });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <Combobox
      as="div"
      value={value}
      onChange={handleSelect}
      onClose={() => setQuery("")}
    >
      <ComboboxInput
        aria-label="Search for an address"
        displayValue={(address: string) => address} // Ensure this returns a string
        onChange={(e) => {
          setQuery(e.target.value);
          setValue(e.target.value);
        }}
        disabled={!ready}
        placeholder="Search for an address"
        className={`pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
          !ready ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />
      <ComboboxOptions className="border border-gray-300 mt-1 rounded-md shadow-lg bg-white">
        {status === "OK" &&
          filteredSuggestions.map((suggestion) => (
            <ComboboxOption
              key={suggestion.place_id}
              value={suggestion.description}
              className="cursor-pointer p-2 hover:bg-gray-100"
            >
              {suggestion.description}
            </ComboboxOption>
          ))}
      </ComboboxOptions>
    </Combobox>
  );
};

export default AddressCombobox;
