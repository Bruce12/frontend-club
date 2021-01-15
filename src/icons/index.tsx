import { defineComponent, App } from 'vue'
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
    const svgDataFn = MAP[props.name]
    let svgData = svgError
    if (svgDataFn) svgData = svgDataFn()
    return () => (
      <icon width={ props.width } height={ props.height } data={svgData}></icon>
    )
  }
})
const svgCompoents = {
  install: (app: App): void => {
    app.component(svgIcon.name, svgIcon)
  }
}
export default svgCompoents
