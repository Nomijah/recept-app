"use client";
import React from "react";
import { useForm } from "@mantine/form";
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
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { unitsList, Unit, mainCategoriesList, MainCategories } from "@/app/Schemas/helperTypes";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { LuGripVertical } from "react-icons/lu";
import { FaTrashAlt } from "react-icons/fa";
import { recipeFormValues } from "@/app/Schemas/formValues";

const RecipeForm = () => {
  function isUnit(value: any): value is Unit {
    return unitsList.includes(value);
  }
  const form = useForm<recipeFormValues>({
    initialValues: {
      title: "",
      description: "",
      portions: 0,
      portionsUnit: "",
      ingredients: [{ name: "", quantity: null, unit: "" }],
      instructions: [""],
      mainCategory: null,
      subCategory: "",
      tags: [],
      imageUrl: "",
      public: false,
    },

    validate: {
      title: (value) =>
        value.length > 2 ? null : "Titeln måste innehålla minst tre tecken",
      description: (value) =>
        value.length < 100
          ? null
          : "Beskrivningen får innehålla max 100 tecken",
      ingredients: {
        name: (value) => (value.length > 0 ? null : "Fyll i en ingrediens"),
        quantity: (value: number | null) =>
          value !== null ? null : "Skriv ett antal",
        unit: (value: Unit | "") =>
          value !== "" && unitsList.toString().includes(value)
            ? null
            : "Välj en enhet från listan",
      },
      mainCategory: (value: MainCategories | null) => value !== null && mainCategoriesList.toString().includes(value)
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

  return (
    <Flex p="lg" direction="column" align="center">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Box maw={340} mx="auto">
          <TextInput
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
            <Button
              onClick={() =>
                form.insertListItem("instructions", "")
              }
            >
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
            placeholder="Lägg till bild"
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
