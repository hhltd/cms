import { App } from 'vue';
import 'element-plus/lib/theme-chalk/base.css';
import {
  ElButton,
  ElAside,
  ElAlert,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubmenu,
  ElMenuItem,
  ElMenuItemGroup,
} from 'element-plus';

const components = [
  ElButton,
  ElAside,
  ElAlert,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubmenu,
  ElMenuItem,
  ElMenuItemGroup,
];

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component);
  }
}
