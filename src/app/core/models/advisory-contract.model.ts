export interface AdvisoryContract {
    advisoryContractId: string;
    professorId: string;
    studentId: string;
    researchLineId: string;
    thesisTopic: string;
    message: string;
    status: number| null;
    student: {
      id: string;
      userId: string;
      user: {
        id: string;
        tenantId: string;
        email: string;
        firstName: string;
        lastName: string;
        role: number;
        status: number;
      };
      code: string;
    };
    professor: {
      id: string;
      userId: string;
      researchGroupId: string;
      isCoordinator: boolean;
      user: {
        id: string;
        tenantId: string;
        email: string;
        firstName: string;
        lastName: string;
        role: number;
        status: number;
      };
      researchGroup: {
        id: string;
        name: string;
      };
    };
    researchLine: {
      id: string;
      researchGroupId: string;
      name: string;
      code: string;
    };
  }