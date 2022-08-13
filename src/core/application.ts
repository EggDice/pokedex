export interface Application<
  EXTERNAL_SERVICES extends Record<string, any>,
  INTERNAL_SERVICES extends Record<string, any>,
  DELIVERY extends Record<string, any>,
  OUTPUT = number,
  RUN_ARGS = Partial<AppArgs<EXTERNAL_SERVICES, INTERNAL_SERVICES, DELIVERY>>,
  RUN_RETURN = { services: INTERNAL_SERVICES, delivery: DELIVERY, output: OUTPUT },
> {
  readonly run: (args?: RUN_ARGS) => RUN_RETURN
}

export interface AppArgs<
  EXTERNAL_SERVICES extends Record<string, any>,
  INTERNAL_SERVICES extends Record<string, any>,
  DELIVERY extends Record<string, any>,
> {
  readonly preRender?: (services: INTERNAL_SERVICES) => void
  readonly getInternalServices?: (externalServices: EXTERNAL_SERVICES) => INTERNAL_SERVICES
  readonly getExternalServices?: () => EXTERNAL_SERVICES
  readonly getDelivery?: (services: INTERNAL_SERVICES) => DELIVERY
  readonly render?: (arg: { services: INTERNAL_SERVICES, delivery: DELIVERY }) => any
};

export const createApplication = <
  EXTERNAL_SERVICES extends Record<string, any> = {},
  INTERNAL_SERVICES extends Record<string, any> = {},
  DELIVERY extends Record<string, any> = {},
  OUTPUT = number,
>(appArgs: AppArgs<EXTERNAL_SERVICES, INTERNAL_SERVICES, DELIVERY>):
  Application<EXTERNAL_SERVICES, INTERNAL_SERVICES, DELIVERY, OUTPUT> => ({
    run: (runArgs = {}) => {
      const defaults = {
        preRender: () => {},
        getInternalServices: (services: EXTERNAL_SERVICES) => services as INTERNAL_SERVICES,
        getExternalServices: () => ({} as unknown as EXTERNAL_SERVICES),
        getDelivery: () => ({} as unknown as DELIVERY),
        render: () => 0,
      }
      const {
        getExternalServices,
        getInternalServices,
        preRender,
        getDelivery,
        render,
      } = { ...defaults, ...appArgs, ...runArgs }
      const services = getInternalServices(getExternalServices())
      preRender(services)
      const delivery = getDelivery(services)
      const output = render({ services, delivery })
      return { services, delivery, output }
    },
  })
