import { mount } from "@vue/test-utils";

import Input from "@/components/Form/Input.vue";

const wrapper = mount(Input, {
  props: {
    id: "my-input",
    modelValue: "",
    label: "Input label",
    name: "my-input",
    icon: "search",
  },
});

describe("Loads and displays Input component", () => {
  it("renders correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("contains svg, label and base classes", () => {
    expect(wrapper.find("svg").exists()).toBeTruthy();
    expect(wrapper.text()).toContain("Input label");

    expect(wrapper.classes("flex")).toBe(true);
    expect(wrapper.classes("flex-col")).toBe(true);
  });
});
