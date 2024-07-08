// "use client";
import { Pokemon } from "@/types";
import { TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import React from "react";
import Script from "next/script";
import { Play, Check, X } from "lucide-react";
import { clsx } from "clsx";

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
    validateInputOnChange: true,

    validate: {
      pokemonName: (value) => {
        console.log(value.toLowerCase(), pokemonName.charAt(0).toLowerCase());
        return value.toLowerCase() === pokemonName.charAt(0).toLowerCase()
          ? null
          : "r";
        // : "Mauvaise lettre!";
      },
    },
  });

  const handleNext = () => {
    router.push(`/pokemon/${pokemonId + 1}`);
  };

  const isValid = form.isValid();
  return (
    <>
      <Script src="https://code.responsivevoice.org/responsivevoice.js?key=PjATEBLw"></Script>
      <audio controls ref={refAudio} className="hidden">
        <source src={pokemon?.cries.latest} type="audio/ogg" />
      </audio>
      <form
        onSubmit={form.onSubmit(() => {
          console.log("success");
        })}
      >
        <div className="relative flex align-center  mb-8">
          <TextInput
            type="text"
            placeholder=""
            key={form.key("pokemonName")}
            {...form.getInputProps("pokemonName")}
            className={clsx(
              "[&_*]:text-4xl [&_*]:capitalize [&_*]:h-[100px]  w-[300px]",
              !isValid && "[&_input]:border-[3px]",
              isValid && "[&_input]:border-[#00ff55] [&_input]:border-[3px]"
            )}
            // className="[&_*]:text-0 [&_*]:h-[100px] [&_*]:text-white w-[300px]"
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
          {/* <p className="uppercase text-4xl text-black absolute top-[20px] p-3">
            {form.getValues().pokemonName}
          </p> */}

          {/* <Button variant="filled" type="submit">
            Vérifier
          </Button> */}

          {!isValid && <X size={100} className="stroke-rose-800" />}
          {isValid && <Check size={100} color="#00ff55" />}
        </div>

        {isValid && (
          <div className="bg-whit">
            <Button
              variant="filled"
              type="button"
              className="mr-4"
              onClick={() => {
                refAudio.current?.play();
              }}
            >
              <Play />
            </Button>

            <Button variant="light" onClick={handleNext}>
              Suivant
            </Button>
          </div>
        )}
      </form>
    </>
  );
};
