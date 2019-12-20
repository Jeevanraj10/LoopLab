import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  // title = "looplab";
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  loginform: FormGroup;
  registerform: FormGroup;
  isLoading: boolean = false;
  submitted: boolean = false;
  error: string = null;
  IsmodelShow: boolean = false;

  ngOnInit() {
    this.registerform = this.formBuilder.group({
      // username: ["", Validators.required],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]
      ],
      password: ["", [Validators.required, Validators.minLength(6)]]
      // confirmPassword: ["", [Validators.required, Validators.minLength(6)]]
    });
  }
  get registerControl() {
    return this.registerform.controls;
  }
  onRegister(form: FormGroup) {
    this.submitted = true;

    // stop here if form is invalid
    if (!this.registerform.valid) {
      return;
    }

    this.isLoading = true;
    // const username = registerForm.value.username;
    const email = form.value.email;
    const password = form.value.password;

    // const confirmpassword = registerForm.value.confirmpassword;
    this.authService.signup(email, password).subscribe(
      resData => {
        console.log("server response data: ", resData);
        this.isLoading = false;
        this.router.navigate(["/dashboard"]);
      },
      errorResponse => {
        console.log("error response data: ", errorResponse);
        this.error = errorResponse;
        this.isLoading = false;
      }
    );
  }
  onLogin(loginform: FormGroup) {}
}
