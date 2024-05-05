"use client";
import React from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import {
  Autocomplete,
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  FileInput,
  Flex,
  Group,
  NumberInput,
  Select,
  TagsInput,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { LuGripVertical } from "react-icons/lu";
import { FaTrashAlt } from "react-icons/fa";
import { recipeFormValues } from "@/types/formTypes/formValues";
import { Unit, unitsList } from "@/types/helperTypes/unit";
import {
  MainCategories,
  mainCategoriesList,
} from "@/types/helperTypes/mainCategories";
import { convertFormValues } from "@/helperFunctions/convertFormValues";

const RecipeForm = () => {
  function isUnit(value: any): value is Unit {
    return unitsList.includes(value);
  }
  const form = useForm<recipeFormValues>({
    initialValues: {
      title: "",
      description: "",
      portions: 1,
      portionsUnit: "",
      ingredients: [{ name: "", quantity: null, unit: "" }],
      instructions: [""],
      mainCategory: null,
      subCategory: "",
      tags: [],
      image: null,
      caption: "",
      public: false,
    },

    validate: {
      title: (value) =>
        value.length > 2 ? null : "Titeln måste innehålla minst tre tecken",
      description: (value) =>
        value.length < 100
          ? null
          : "Beskrivningen får innehålla max 100 tecken",
      ingredients: isNotEmpty("Minst en ingrediens måste läggas till") && {
        name: (value) => (value.length > 0 ? null : "Fyll i en ingrediens"),
        quantity: (value: number | null) =>
          value !== null ? null : "Skriv ett antal",
        unit: (value: Unit | "") =>
          value !== "" && unitsList.toString().includes(value)
            ? null
            : "Välj en enhet från listan",
      },
      instructions: isNotEmpty(
        "Minst ett stycke instruktioner måste fyllas i"
      ),
      mainCategory: (value: MainCategories | null) =>
        value !== null && mainCategoriesList.toString().includes(value)
          ? null
          : "Välj en kategori från listan",
    },
  });

  const ingredientFields = form.values.ingredients.map((_, index) => (
    <Draggable key={index} index={index} draggableId={index.toString()}>
      {(provided) => (
        <Group ref={provided.innerRef} mt="sm" {...provided.draggableProps}>
          <Center {...provided.dragHandleProps}>
            <LuGripVertical size="1.2rem" />
          </Center>
          <TextInput
            placeholder="Ingrediens"
            {...form.getInputProps(`ingredients.${index}.name`)}
          />
          <NumberInput
            placeholder="Mängd"
            {...form.getInputProps(`ingredients.${index}.quantity`)}
          />
          <Autocomplete
            placeholder="Välj eller skriv enhet"
            data={unitsList}
            {...form.getInputProps(`ingredients.${index}.unit`)}
          />
          <Button onClick={() => form.removeListItem("ingredients", index)}>
            <FaTrashAlt />
          </Button>
        </Group>
      )}
    </Draggable>
  ));

  const instructionFields = form.values.instructions.map((_, index) => (
    <Draggable key={index} index={index} draggableId={index.toString()}>
      {(provided) => (
        <Group ref={provided.innerRef} mt="sm" {...provided.draggableProps}>
          <Center {...provided.dragHandleProps}>
            <LuGripVertical size="1.2rem" />
          </Center>
          <Title order={5}>{index + 1}.</Title>
          <Textarea
            w={570}
            placeholder="Skriv instruktioner här och lägg till stycke med knappen nedanför"
            {...form.getInputProps(`instructions.${index}`)}
          />
          <Button onClick={() => form.removeListItem("instructions", index)}>
            <FaTrashAlt />
          </Button>
        </Group>
      )}
    </Draggable>
  ));

  async function testDb(data: any) {
    try {
      // 👇️ const response: Response
      const response = await fetch("http://localhost:8080/recipe/addRecipe", {
        method: "POST",
        body: JSON.stringify(await convertFormValues(data)),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log("result is: ", JSON.stringify(result, null, 4));

      return result;
    } catch (error) {
      if (error instanceof Error) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }

  return (
    <Flex p="lg" direction="column" align="center" className="div-main">
      <form onSubmit={form.onSubmit((values) => testDb(values))}>
        <Box maw={340} mx="auto">
          <TextInput
            classNames={{input: "input"}}
            withAsterisk
            label="Titel"
            placeholder="Skriv namn på receptet här"
            {...form.getInputProps("title")}
          />

          <Textarea
            label="Beskrivning"
            placeholder="Kort beskrivning av receptet"
            {...form.getInputProps("description")}
          />

          <Flex>
            <NumberInput
              label="Receptet räcker till:"
              placeholder="Antal"
              min={1}
              {...form.getInputProps("portions")}
            />
            <TextInput
              label="Enhet"
              placeholder="t.ex. portioner"
              {...form.getInputProps("portionsUnit")}
            />
          </Flex>
        </Box>

        <Divider my="sm" />

        <Box w="100%">
          <Group justify="center">
            <Title order={5}>Ingredienser</Title>
          </Group>
          <Group justify="center">
            <Text size="xs">
              (Minst en måste fyllas i för att spara receptet)
            </Text>
          </Group>
          <Flex direction={"row"} justify="center">
            <DragDropContext
              onDragEnd={({ destination, source }) =>
                destination?.index !== undefined &&
                form.reorderListItem("ingredients", {
                  from: source.index,
                  to: destination.index,
                })
              }
            >
              <Droppable droppableId="dnd-list" direction="vertical">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {ingredientFields}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Flex>

          <Group justify="center" mt="sm">
            <Button
              onClick={() =>
                form.insertListItem("ingredients", {
                  name: "",
                  quantity: null,
                  unit: "",
                })
              }
            >
              Lägg till ingrediens
            </Button>
          </Group>
        </Box>

        <Divider my="sm" />

        <Box w="100%">
          <Group justify="center">
            <Title order={5}>Instruktioner</Title>
          </Group>
          <Group justify="center">
            <Text size="xs">
              (Minst en måste fyllas i för att spara receptet)
            </Text>
          </Group>
          <Flex direction={"row"} justify="center">
            <DragDropContext
              onDragEnd={({ destination, source }) =>
                destination?.index !== undefined &&
                form.reorderListItem("instructions", {
                  from: source.index,
                  to: destination.index,
                })
              }
            >
              <Droppable droppableId="dnd-list" direction="vertical">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {instructionFields}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Flex>

          <Group justify="center" mt="sm">
            <Button onClick={() => form.insertListItem("instructions", "")}>
              Lägg till stycke
            </Button>
          </Group>
        </Box>

        <Divider my="sm" />

        <Box maw={340} mx="auto">
          <Select
            required
            label="Välj huvudkategori"
            placeholder="Välj ett alternativ i listan"
            data={mainCategoriesList}
            {...form.getInputProps("mainCategory")}
          />

          <TextInput
            label="Skriv en underkategori (valfritt)"
            placeholder="T.ex. soppor"
            {...form.getInputProps("subCategory")}
          />

          <TagsInput
            label="Lägg till taggar (valfritt)"
            placeholder="Tryck enter för att lägga till fler"
            {...form.getInputProps("taggar")}
          />

          <FileInput
            accept="image/png,image/jpeg"
            label="Lägg till bild (valfritt)"
            placeholder="Lägg till bild (Max. filstorlek: 2MB)"
            {...form.getInputProps("image")}
          />

          <TextInput
            label="Skriv en text till din bild (valfritt)"
            placeholder='T.ex. "Rätten serverad med nybakt bröd."'
            {...form.getInputProps("caption")}
          />

          <Checkbox
            mt="md"
            label="Jag vill göra receptet publikt"
            {...form.getInputProps("public", { type: "checkbox" })}
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit">Spara</Button>
          </Group>
        </Box>
      </form>
    </Flex>
  );
};

export default RecipeForm;
