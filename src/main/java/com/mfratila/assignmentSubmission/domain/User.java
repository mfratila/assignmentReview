package com.mfratila.assignmentSubmission.domain;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;



@Entity
@Table(name="users")
public class User implements UserDetails {

	
	private static final long serialVersionUID = 3045313497762334492L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private LocalDate cohortStartDate;
	private String username;
	@JsonIgnore
	private String password;
	@OneToMany(fetch = FetchType.EAGER, mappedBy = "user", cascade = CascadeType.REMOVE)
	@JsonIgnore
	private List<Authority> authorities = new ArrayList<>();
	private String name;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	public LocalDate getCohortStartDate() {
		return cohortStartDate;
	}
	
	public void setCohortStartDate(LocalDate cohortStartDate) {
		this.cohortStartDate = cohortStartDate;
	}
	
	@Override
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	@Override
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	public void setAuthorities(List<Authority> authorities) {
		this.authorities = authorities;
	}
	
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	
	@Override
	public boolean isEnabled() {
		return true;
	}
}
