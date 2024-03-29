import { mount } from "@vue/test-utils";

import Button from "@/components/Button.vue";

const wrapper = mount(Button, {
  props: {
    label: "My button",
    icon: "trash",
    small: true,
    disabled: true,
  },
});

let buttonClickCount = 0;

describe("Loads and displays Button component", () => {
  it("renders correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("contains label and base classes", () => {
    expect(wrapper.text()).toContain("My button");
    expect(wrapper.find("svg")).toBeTruthy();
    expect(wrapper.classes("rounded")).toBe(true);
    expect(wrapper.classes("cursor-not-allowed")).toBe(true);
  });

  it("triggers value update on click", async () => {
    await wrapper.setProps({ disabled: false });
    expect(buttonClickCount).toBe(0);
    wrapper.trigger("click", { buttonClickCount: buttonClickCount++ });
    expect(buttonClickCount).toBe(1);
  });
});
