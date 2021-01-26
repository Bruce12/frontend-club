import { defineComponent, App, watch, ref } from 'vue'
import svgError from '@/icons/svg/error.svg'
import MAP from './modules'
const svgIcon = defineComponent({
  name: 'svgicon',
  props: {
    width: {
      type: String,
      default: '1em'
    },
    height: {
      type: String,
      default: '1em'
    },
    name: {
      type: String,
      default: 'radio'
    }
  },
  setup(props) {
    const svgData = ref(svgError)
    const svgDataFn = MAP[props.name]
    watch(
      () => props.name,
      (value) => {
        svgData.value = MAP[value]()
      }
    )
    if (svgDataFn) svgData.value = svgDataFn()
    return () => <icon width={ props.width } height={ props.height } data={svgData.value}></icon>
  }
})
const svgCompoents = {
  install: (app: App): void => {
    app.component(svgIcon.name, svgIcon)
  }
}
export default svgCompoents
