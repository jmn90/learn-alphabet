// "use client";
import { Pokemon } from "@/types";
import { TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import React from "react";
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
  const router = useRouter();

  const refAudio = React.useRef<HTMLAudioElement>(null);

  const form = useForm({
    mode: "controlled",
    initialValues: {
      pokemonName: "",
    },

    validate: {
      pokemonName: (value) => {
        // console.log(value.toLowerCase(), pokemonName.charAt(0).toLowerCase());
        return value.toLowerCase() === pokemonName.charAt(0).toLowerCase()
          ? null
          : "Mauvaise lettre!";
      },
    },
  });

  const handleNext = () => {
    router.push(`/pokemon/${pokemonId + 1}`);
  };

  if (form.errors.pokemonName) {
    // form.setFieldValue("pokemonName", "");
  }
  return (
    <>
      <Script src="https://code.responsivevoice.org/responsivevoice.js?key=PjATEBLw"></Script>
      <audio controls ref={refAudio} className="hidden">
        <source src={pokemon?.cries.latest} type="audio/ogg" />
      </audio>
      <form
        onSubmit={form.onSubmit(() => {
          // console.log("success");
          // refAudio.current?.play();
        })}
      >
        <div className="relative flex align-items-center  mb-8">
          <TextInput
            type="text"
            placeholder=""
            key={form.key("pokemonName")}
            {...form.getInputProps("pokemonName")}
            className="[&_*]:text-0 [&_*:first-child]:h-[100px] [&_*]:text-white w-[300px]"
            maxLength={1}
            // onKeyDown={(event) => {
            //   const value = event.key.toUpperCase();
            //   responsiveVoice.speak(value);
            // }}
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
            <div className="my-12 text-4xl">Good Job!</div>

            <Button
              variant="filled"
              color="green"
              size="xl"
              onClick={handleNext}
            >
              Suivant
            </Button>
          </>
        )}
      </form>
    </>
  );
};
