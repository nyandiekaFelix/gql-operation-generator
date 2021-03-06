
class Generator {

  /**
   * Creates an instance of Generator.
   *
   * @param {Object} operation - The operation object. Destructured in the constructor
   * @param {string} operation.operationType - The operation type
   * @param {string} operation.operationName - The operation name
   * @param {array} operation.fields - Fields used in the operation
   * @param {Object} operation.data - Data used in the operation
   * @param {Object} operation.variables - Operation variables
   *
   * @memberof Generator
   */
  constructor({
    operationType = 'query',
    operationName,
    fields = [],
    data = {},
    variables = {},
  }){
    this.operationType = operationType;
    this.operationName = operationName;
    this.fields = fields;
    this.data = data;
    this.variables = variables;

    return this.generateOperation();
  }


  /**
   * @static
   * @param {*} - key
   * @returns {string} - The gql type of the key
   * @memberof Generator
   */
  static getType(key) {
    switch (typeof key) {
      case 'boolean':
        return 'Boolean';
      case 'number':
        return (key % 1 === 0) ? 'Int' : 'Float'
      default:
        return 'String';
    }
  }


  /**
   * Map an argument to its gql type
   *
   * @returns {string} - an argument matched with its type
   * @memberof Generator
   */
  mapArgumentType() {
    const props = Object.keys(this.data);
    const reducer = (dataKey, currKey, index) => {
      console.log('acc', dataKey, '\ncurr', currKey, '\nind', index);
      return `${ dataKey }${ index !== 0 ? ', ' : ''}$${ currKey }: ${ this.constructor.getType(this.data[currKey]) }`
    };

    return props.length ? `(${ props.reduce(reducer, '') })` : ''
  }


  /**
   * Map an argument to its gql name
   *
   * @returns {string} - an argument matched with its name
   * @memberof Generator
   */
  mapArgumentName() {
    const props = Object.keys(this.data);
    const reducer = (dataKey, currKey, index) => (
      `${ dataKey }${ index !== 0 ? ', ' : '' }${ currKey }: $${ currKey }`
    );

    return props.length ? `(${ props.reduce(reducer, '') })` : ''
  }


  /**
   * Generate the gql operation
   * @returns {Object} - the generated gql operation
   * @memberof Generator
   */
  generateOperation() {
    const result = {
      operation: `${ this.operationType } ${ this.mapArgumentType() } {
                    ${ this.operationName } ${ this.mapArgumentName() } {
                      ${ this.fields.join(',\n') }
                    }
                  }`,
      variables: Object.assign(this.data, this.variables),
    };

    return result;
  }

}

export default Generator;
