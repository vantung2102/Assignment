import React from "react";

const useEdit = (array, action) => {
  return array.map((item) =>
    item.attributes.id === action.payload.data.attributes.id
      ? (item = action.payload.data)
      : item
  );
};

const useDestroy = (array, action) => {
  return array.filter((item) => item.attributes.id !== action.payload);
};

const optionSelect2 = (array, attr) => {
  return array?.map((item) => {
    return { value: item.id, label: item.attributes[attr] };
  });
};

export { useEdit, useDestroy, optionSelect2 };
