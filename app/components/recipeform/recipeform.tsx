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
import { unitsList, Unit } from "@/app/Schemas/helperTypes";
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
      instructions: [],
      categories: [],
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
            name: (value) =>
              value.length > 0? null : "Fyll i en ingrediens",
            quantity: (value: number | null) =>
              value !== null ? null : "Skriv ett antal",
            unit: (value: Unit | "") =>
              value !== "" && unitsList.toString().includes(value) ? null : "Välj en enhet från listan",
          }
    },
  });

  const fields = form.values.ingredients.map((_, index) => (
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

  return (
    <Flex p="lg" direction="column" align="center">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Box maw={340} mx="auto">
          <TextInput
            withAsterisk
            label="Titel"
            placeholder="titel"
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
          <Flex direction={"row"}>
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
                    {fields}
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

        <Box maw={340} mx="auto">
          <TagsInput
            label="Lägg till taggar med enter"
            placeholder="Skriv dina taggar här"
          />
          <FileInput accept="image/png,image/jpeg" label="Lägg till bild (valfritt)" placeholder="Lägg till bild" />
          <Checkbox
            mt="md"
            label="Publik"
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
