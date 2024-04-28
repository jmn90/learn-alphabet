// "use client";
import { getFullPokemon } from "@/pokemon";
import { Pokemon } from "@/types";
// import { Button } from "@mantine/core";
// import { useForm } from "react-hook-form";
import { TextInput, Checkbox, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Head from "next/head";
import Script from "next/script";

type PokemonFormProps = {
  pokemonName: string;
  pokemonId: number;
  pokemon?: Pokemon;
};

export const PokemonForm = ({
  pokemonName,
  pokemonId,
  pokemon,
}: PokemonFormProps) => {
  const [value, setValue] = useState("");
  const router = useRouter();
  // const {
  //   register,
  //   handleSubmit: submitForm,
  //   formState: { errors },
  // } = useForm();

  const refAudio = React.useRef<HTMLAudioElement>(null);

  const form = useForm({
    mode: "controlled",
    initialValues: {
      pokemonName: "",
    },

    validate: {
      pokemonName: (value) => {
        console.log(value.toLowerCase(), pokemonName.charAt(0).toLowerCase());
        return value.toLowerCase() === pokemonName.charAt(0).toLowerCase()
          ? null
          : "Mauvaise lettre!";
      },
    },
  });

  const handleNext = () => {
    // console.log(pokemonId);
    router.push(`/pokemon/${pokemonId + 1}`);
  };
  // console.log(pokemon?.cries.latest);
  return (
    <>
      <Script src="https://code.responsivevoice.org/responsivevoice.js?key=PjATEBLw"></Script>
      <audio controls ref={refAudio} className="hidden">
        <source src={pokemon?.cries.latest} type="audio/ogg" />
      </audio>
      <form
        onSubmit={form.onSubmit(() => {
          console.log("success");
          refAudio.current?.play();
        })}
      >
        <div className="relative flex align-items-center  mb-8">
          <TextInput
            type="text"
            placeholder=""
            key={form.key("pokemonName")}
            {...form.getInputProps("pokemonName")}
            className="[&_*]:text-0 [&_*]:h-[100px] [&_*]:text-white w-[300px]"
            maxLength={1}
            onKeyDown={(event) => {
              const value = event.key.toUpperCase();
              responsiveVoice.speak(value);
            }}
            // onChange={(event) => {
            //   setValue(event.currentTarget.value.toUpperCase());
            //   // const utterance = new SpeechSynthesisUtterance(
            //   //   event.currentTarget.value
            //   // );

            //   // // Set the language to French
            //   // utterance.lang = "ca-FR";

            //   // // Speak the letter
            //   // window.speechSynthesis.speak(utterance);
            // }}
            // value={value}
          />
          <p className="uppercase text-4xl text-black absolute top-[20px] p-3">
            {form.getValues().pokemonName}
          </p>
        </div>
        <Button variant="filled" type="submit">
          Vérifier
        </Button>
        {form.isValid() && (
          <>
            <div>Good Job!</div>

            <Button variant="light" onClick={handleNext}>
              Suivant
            </Button>
          </>
        )}
      </form>
    </>
  );
};
