import { describe, expect, it } from 'vitest';
import { isValidCpf } from '../validateDoc';
import { invalidCpf, validCpf } from './mocking';

describe('Function isValidCpf', () => {
  it('Should not be able aprove INVALID CPF', ()=>{
    expect(isValidCpf(invalidCpf)).toBeFalsy();
  })

  it('Should be able aprove VALID CPF', ()=>{
    expect(isValidCpf(validCpf)).toBeTruthy();
  })
});
