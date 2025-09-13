export interface ValidationError {
  field: string;
  message: string;
}

export class SupplierValidator {
  public errors: ValidationError[] = [];

  private addError(field: string, message: string) {
    this.errors.push({ field, message });
  }

  public validate(data: any): ValidationError[] {
    this.errors = [];

    if (!data.name || data.name.trim().length < 2) {
      this.addError(
        "name",
        "Name is required and must be at least 2 characters long."
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      this.addError("email", "A valid email is required.");
    }

    const phoneRegex = /^[7-9]\d{9}$/;
    if (!data.phone || !phoneRegex.test(data.phone)) {
      this.addError(
        "phone",
        "Phone must be 10 digits and start with 7, 8, or 9."
      );
    }

    if (!data.country || data.country.trim() === "") {
      this.addError("country", "Country must not be empty.");
    }

    return this.errors;
  }
}
