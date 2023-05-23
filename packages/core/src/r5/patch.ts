export type JSONPatchBody = Array<JSONPatchOperation>;

export type JSONPatchOperation =
  | JSONPatchOperationAdd
  | JSONPatchOperationRemove
  | JSONPatchOperationReplace
  | JSONPatchOperationMove
  | JSONPatchOperationCopy
  | JSONPatchOperationTest;

export interface JSONPatchOperationAdd {
  op: "add";
  path: string;
  value: unknown;
}

export interface JSONPatchOperationRemove {
  op: "remove";
  path: string;
}

export interface JSONPatchOperationReplace {
  op: "replace";
  path: string;
  value: unknown;
}

export interface JSONPatchOperationMove {
  op: "move";
  path: string;
  from: string;
}

export interface JSONPatchOperationCopy {
  op: "copy";
  path: string;
  from: string;
}

export interface JSONPatchOperationTest {
  op: "test";
  path: string;
  value: unknown;
}

export class FhirPatchBuilder {
  /**
   * The underlying {@link JSONPatchBody}, that can be used directly if needed.
   */
  public patch: JSONPatchBody = [];

  /**
   * Clone the current patch, so that subsequent modifications do not affect the current builder state.
   * @returns a deep copy of the current builder.
   */
  public clone(): this {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cloned = new (this.constructor as any)();
    cloned.patch = JSON.parse(JSON.stringify(this.patch));
    return cloned;
  }

  /**
   * [Adds](https://jsonpatch.com/#add) a value to an object or inserts it into an array.
   * In the case of an array, the value is inserted before the given index.
   * The - character can be used instead of an index to insert at the end of an array.
   */
  public add(path: string, value: unknown): this {
    this.patch.push({
      op: "add",
      path,
      value,
    });
    return this;
  }
}
