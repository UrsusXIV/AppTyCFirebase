import { Injectable, inject } from "@angular/core";
import { Auth, authState, createUserWithEmailAndPassword, UserCredential } from "@angular/fire/auth";

@Injectable({
    providedIn: 'root'
})

export interface Credential{
    email: string,
    password: string
}

export class firebaseAuthService {
    private auth: Auth = inject(Auth);

    readonly authState$ = authState(this.auth)


    signUpWithEmailAndPassword(credential: Credential): Promise<UserCredential> {
        return createUserWithEmailAndPassword(
            this.auth,
            credential.email,
            credential.password
        );
    }
}