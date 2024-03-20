import { mount } from "@vue/test-utils";

import Checkbox from "@/components/Form/Checkbox.vue";

const wrapper = mount(Checkbox, {
  props: {
    id: "my-check",
    modelValue: false,
    disabled: true,
  },
  slots: {
    default: "Checkbox",
  },
});

describe("Loads and displays Checkbox component", () => {
  it("renders correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("gets checked on modelValue change", async () => {
    expect(wrapper.props("modelValue")).toBe(false);
    await wrapper.setProps({ disabled: false, modelValue: true });
    expect(wrapper.props("modelValue")).toBe(true);
  });

  it("contains indeterminate icon", async () => {
    await wrapper.setProps({ indeterminate: true });

    expect(wrapper.find("svg").exists()).toBeFalsy();
    expect(wrapper.find({ ref: "indeterminateRef" }).classes("bg-white")).toBe(true);
    expect(wrapper.find({ ref: "indeterminateRef" }).classes("rounded-full")).toBe(true);
  });
});
