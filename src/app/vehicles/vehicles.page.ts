import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  styleUrls: ['./vehicles.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehiclesPage {
  
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // Loading state for skeleton
  isLoading: boolean = true;

  // Sample vehicles data with image support
  vehicles: any[] = [];

  // Color options for the form
  colorOptions = [
    { name: 'Blue', value: 'linear-gradient(135deg, #2563eb, #1d4ed8)' },
    { name: 'Black', value: 'linear-gradient(135deg, #374151, #1f2937)' },
    { name: 'White', value: 'linear-gradient(135deg, #94a3b8, #64748b)' },
    { name: 'Red', value: 'linear-gradient(135deg, #ef4444, #dc2626)' },
    { name: 'Silver', value: 'linear-gradient(135deg, #9ca3af, #6b7280)' },
    { name: 'Green', value: 'linear-gradient(135deg, #22c55e, #16a34a)' },
    { name: 'Yellow', value: 'linear-gradient(135deg, #fbbf24, #f59e0b)' },
    { name: 'Purple', value: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }
  ];

  // Modal state
  showModal: boolean = false;
  showDetailsModal: boolean = false;
  isEditing: boolean = false;
  editingId: number | null = null;
  selectedVehicleDetails: any = null;

  // Form data
  formData: any = {
    name: '',
    plate: '',
    make: '',
    model: '',
    colorName: '',
    type: '',
    color: '',
    imageUrl: null,
    imageFile: null
  };

  // Current route for bottom nav
  currentRoute: string = 'vehicles';

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private location: Location
  ) {
    this.currentRoute = this.router.url.split('/')[1] || 'vehicles';
    
    // Listen for route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = this.router.url.split('/')[1] || 'vehicles';
      if (this.currentRoute === 'vehicles') {
        this.loadData();
      }
    });
  }

  /**
   * Initialize - Load data with skeleton
   */
  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Load data with skeleton loading
   */
  loadData(): void {
    this.isLoading = true;

    // Simulate API call with 1.5 second delay
    setTimeout(() => {
      this.vehicles = [
        {
          id: 1,
          name: 'BMW X5',
          plate: 'ABC 123 GP',
          make: 'BMW',
          model: 'X5',
          colorName: 'Blue',
          type: 'SUV',
          color: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
          imageUrl: null
        },
        {
          id: 2,
          name: 'Mercedes C-Class',
          plate: 'DEF 456 GP',
          make: 'Mercedes-Benz',
          model: 'C-Class',
          colorName: 'Black',
          type: 'Sedan',
          color: 'linear-gradient(135deg, #374151, #1f2937)',
          imageUrl: null
        },
        {
          id: 3,
          name: 'Toyota Corolla',
          plate: 'GHI 789 GP',
          make: 'Toyota',
          model: 'Corolla',
          colorName: 'White',
          type: 'Sedan',
          color: 'linear-gradient(135deg, #94a3b8, #64748b)',
          imageUrl: null
        }
      ];
      this.isLoading = false;
    }, 1500);
  }

  /**
   * Navigate to a page (for bottom nav)
   */
  navigateTo(page: string): void {
    if (page === this.currentRoute) return;
    this.navCtrl.navigateForward(`/${page}`);
  }

  /**
   * Check if a tab is active (for bottom nav)
   */
  isActive(page: string): boolean {
    return this.currentRoute === page;
  }

  /**
   * Go back to previous page
   */
  goBack(): void {
    try {
      this.location.back();
    } catch (error) {
      this.navCtrl.navigateRoot('/home');
    }
  }

  /**
   * Open add vehicle modal
   */
  openAddModal(): void {
    this.isEditing = false;
    this.editingId = null;
    this.formData = {
      name: '',
      plate: '',
      make: '',
      model: '',
      colorName: '',
      type: '',
      color: '',
      imageUrl: null,
      imageFile: null
    };
    this.showModal = true;
  }

  /**
   * Open edit vehicle modal
   */
  openEditModal(vehicle: any): void {
    this.isEditing = true;
    this.editingId = vehicle.id;
    this.formData = {
      name: vehicle.name,
      plate: vehicle.plate,
      make: vehicle.make,
      model: vehicle.model,
      colorName: vehicle.colorName,
      type: vehicle.type,
      color: vehicle.color,
      imageUrl: vehicle.imageUrl || null,
      imageFile: null
    };
    this.showModal = true;
  }

  /**
   * Close modal
   */
  closeModal(): void {
    this.showModal = false;
  }

  /**
   * View vehicle details - Opens details modal
   */
  viewVehicle(vehicle: any): void {
    console.log('[Vehicles] Viewing vehicle:', vehicle);
    this.selectedVehicleDetails = { ...vehicle };
    this.showDetailsModal = true;
  }

  /**
   * Close details modal
   */
  closeDetailsModal(): void {
    this.showDetailsModal = false;
    this.selectedVehicleDetails = null;
  }

  /**
   * Edit from details modal
   */
  editFromDetails(): void {
    if (this.selectedVehicleDetails) {
      this.closeDetailsModal();
      // Small delay to allow modal to close
      setTimeout(() => {
        this.openEditModal(this.selectedVehicleDetails);
      }, 300);
    }
  }

  /**
   * Delete from details modal
   */
  deleteFromDetails(): void {
    if (this.selectedVehicleDetails) {
      const vehicle = this.selectedVehicleDetails;
      this.closeDetailsModal();
      // Small delay to allow modal to close
      setTimeout(() => {
        this.deleteVehicle(vehicle);
      }, 300);
    }
  }

  /**
   * Select color
   */
  selectColor(color: string): void {
    this.formData.color = color;
  }

  /**
   * Trigger file input click
   */
  uploadImage(): void {
    this.fileInput.nativeElement.click();
  }

  /**
   * Handle file selection
   */
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.formData.imageUrl = e.target.result;
        this.formData.imageFile = file;
        // Trigger change detection
        setTimeout(() => {}, 0);
      };
      reader.readAsDataURL(file);
    }
    // Reset input
    event.target.value = '';
  }

  /**
   * Remove image
   */
  removeImage(): void {
    this.formData.imageUrl = null;
    this.formData.imageFile = null;
  }

  /**
   * Save vehicle (add or update)
   */
  saveVehicle(): void {
    // Validate form
    if (!this.formData.name || !this.formData.plate || !this.formData.make || 
        !this.formData.model || !this.formData.colorName || !this.formData.type || !this.formData.color) {
      alert('Please fill in all fields');
      return;
    }

    // In a real app, you would upload the image to a server here
    // For now, we'll store the base64 image URL
    const vehicleData = {
      name: this.formData.name,
      plate: this.formData.plate,
      make: this.formData.make,
      model: this.formData.model,
      colorName: this.formData.colorName,
      type: this.formData.type,
      color: this.formData.color,
      imageUrl: this.formData.imageUrl // Store base64 image
    };

    if (this.isEditing && this.editingId) {
      // Update existing vehicle
      const index = this.vehicles.findIndex(v => v.id === this.editingId);
      if (index !== -1) {
        this.vehicles[index] = {
          ...this.vehicles[index],
          ...vehicleData
        };
      }
      console.log('[Vehicles] Vehicle updated:', vehicleData);
    } else {
      // Add new vehicle
      const newVehicle = {
        id: Date.now(),
        ...vehicleData
      };
      this.vehicles.push(newVehicle);
      console.log('[Vehicles] Vehicle added:', newVehicle);
    }

    // Close modal
    this.closeModal();
  }

  /**
   * Delete vehicle
   */
  deleteVehicle(vehicle: any): void {
    console.log('[Vehicles] Deleting vehicle:', vehicle);
    // Show confirmation dialog
    if (confirm(`Are you sure you want to delete ${vehicle.name}?`)) {
      // Remove vehicle from list
      this.vehicles = this.vehicles.filter(v => v.id !== vehicle.id);
    }
  }
}