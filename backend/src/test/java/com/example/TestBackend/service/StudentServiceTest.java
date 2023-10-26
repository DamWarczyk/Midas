package com.example.TestBackend.service;

import com.example.TestBackend.model.Role;
import com.example.TestBackend.model.Student;
import com.example.TestBackend.repo.RoleRepo;
import com.example.TestBackend.repo.StudentRepo;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;



@RunWith(SpringRunner.class)
public class StudentServiceTest {

    @Mock
    private StudentRepo studentRepo;

    @Mock
    private RoleRepo roleRepo;

    @Mock
    private PasswordEncoder passwordEncoder;

    private StudentService studentService;

    @Before
    public void setUp() {
        studentService = new StudentService(studentRepo, roleRepo, passwordEncoder);
    }

    @Test
    public void testLoadUserByUsername_UserFound() {

        Student mockStudent = new Student();
        mockStudent.setEmail("test@example.com");
        mockStudent.setPassword("password");
        Role role = new Role();
        role.setName("ROLE_USER");
        mockStudent.getRoles().add(role);


        when(studentRepo.findStudentByEmail("test@example.com")).thenReturn(mockStudent);


        UserDetails userDetails = studentService.loadUserByUsername("test@example.com");


        assertEquals("test@example.com", userDetails.getUsername());
        assertEquals("password", userDetails.getPassword());
        assertEquals(1, userDetails.getAuthorities().size());
    }

    @Test(expected = UsernameNotFoundException.class)
    public void testLoadUserByUsername_UserNotFound() {

        when(studentRepo.findStudentByEmail("nonexistent@example.com")).thenReturn(null);


        studentService.loadUserByUsername("nonexistent@example.com");
    }

}
