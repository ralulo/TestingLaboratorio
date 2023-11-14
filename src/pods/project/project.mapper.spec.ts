import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';
import { mapProjectFromApiToVm } from './project.mapper';

describe('Project Mappers', () => {
  describe('mapProjectFromApiToVm', () => {
    it('should return empty project when feeding undefined', () => {
      // Arrange
      const project = undefined;

      // Act
      const result = mapProjectFromApiToVm(project);

      // Assert
      expect(result).toEqual(viewModel.createEmptyProject());
    });

    it('should map project from vm to api correctly', () => {
      // Arrange
      const project: viewModel.Project = {
        id: 'Id project',
        isActive: true,
        name: 'Project name',
        employees: [
          {
            id: 'Id employee',
            isAssigned: true,
            employeeName: 'Employee name',
          },
        ],
      };

      const expectedResult: apiModel.Project = {
        ...project,
        employees: project.employees.map(e => ({
          ...e,
        })),
      };

      // Act
      const result = mapProjectFromApiToVm(project);

      // Assert
      expect(result).toEqual(expectedResult);
    });

    it('Should return empty array when project employess feeding undefined', () => {
      // Arrange
      const project: viewModel.Project = {
        id: 'Id project',
        isActive: true,
        name: 'Project name',
        employees: undefined
      };

      const expectedResult: apiModel.Project = {
        ...project,
        employees: []
      };

      // Act
      const result = mapProjectFromApiToVm(project);

      // Assert
      expect(result).toEqual(expectedResult);

    });
  });
});



