const mockSdk = () => {
  return {
    app: {
      onConfigure: jest.fn(),
      getParameters: jest.fn().mockReturnValue({}),
      setReady: jest.fn(),
      getCurrentState: jest.fn(),
    },
    window: {
      startAutoResizer: jest.fn()
    },
    notifier: {
      error: jest.fn()
    },
    entry: {
      getSys: jest.fn().mockReturnValue({id: 'test'}),
      fields: {
        inheritHoursFromParent: {
          setValue: jest.fn(),
          getValue: jest.fn(),
          onValueChanged: jest.fn()
        },
        hoursVaryByProgramming: {
          setValue: jest.fn(),
          getValue: jest.fn(),
          onValueChanged: jest.fn()
        },
        parentVenue: {
          setValue: jest.fn(),
          getValue: jest.fn().mockReturnValue({sys: {id: 'test2'}}),
          onValueChanged: jest.fn()
        }
      }
    },
    field: {
      setValue: jest.fn(),
      getValue: jest.fn(),
      setInvalid: jest.fn()
    },
    ids: {
      app: 'test-app',
    },
  } as any;
}

export { mockSdk };
