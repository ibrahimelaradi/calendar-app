import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateInviteDto } from '@calendar-app/schemas/dtos/invites.dto';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';

@Component({
  selector: 'app-invite-prompt',
  standalone: true,
  imports: [TuiInputModule, ReactiveFormsModule, TuiButtonModule, FormsModule],
  templateUrl: './invite-prompt.component.html',
  styleUrl: './invite-prompt.component.css',
})
export class InvitePromptComponent {
  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
  });
  @Output() invite = new EventEmitter<CreateInviteDto>();
  onSubmit() {
    if (!this.form.valid) return;
    this.invite.emit(this.form.value as CreateInviteDto);
  }
}
