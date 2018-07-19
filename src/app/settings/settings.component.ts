import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { StorageService } from '../storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<SettingsComponent>,
    private formBuilder: FormBuilder,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.settingsForm = this.formBuilder.group(this.storageService.settings);
  }

  onSubmit() {
    this.storageService.settings = this.settingsForm.value;
    this.settingsForm.setValue(this.storageService.settings);
    this.dialogRef.close();
  }
}
