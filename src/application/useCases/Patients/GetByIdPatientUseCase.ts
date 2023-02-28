import { Inject, Injectable } from "@nestjs/common"
import { Patient } from "../../../domain/Patient/Patient"
import { PatientRepository } from "../../../domain/Patient/PatientRepository"
import { ErrorManager } from "../../../infrastructure/errorHandler/ErrorManager"

@Injectable()
export class GetByIdPatientUseCase {
  constructor(
    @Inject(PatientRepository)
    private readonly patientRepository: PatientRepository,
  ) {}

  public async execute(id: string): Promise<Patient> {
    try {
      const patient: Patient = await this.patientRepository.findOne(id)
      if (!patient) {
        throw new ErrorManager({
          type: "BAD_REQUEST",
          message: "no patient found",
        })
      }
      return patient
    } catch (error) {
      throw ErrorManager.createSignature(error.message)
    }
  }
}
